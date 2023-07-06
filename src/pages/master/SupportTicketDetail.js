import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor } from "../../components/elements";
import {
  Breadcrumb,
  RoundAvatar,
  DivideTitle,
  DuelText,
} from "../../components";
import { CardLayout, CardHeader } from "../../components/cards";
import { Button, Textarea } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/supportTicketDetail.json";
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import {
  getSingleTicket,
  sendTicketMsg,
} from "../../redux/reducers/supportTicket";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userId from "../../userId";

export default function SupportTicketDetail() {
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams();
  const adminId = userId();
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.supportTicket.ticket);

  useEffect(() => {
    const data = {
      ticketId: id,
    };
    dispatch(getSingleTicket(data));
  }, [id]);

  const handleSendMsg = () => {
    if (newMessage === "") {
      toast.error("Message cannot be blank.");
    } else {
      const data = {
        ticketId: id,
        message: newMessage,
        sender: adminId,
        date: Date.now(),
      };
      dispatch(sendTicketMsg(data), setLoading(true)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setLoading(false);
          toast.success("Message successfully sent.");
        } else {
          setLoading(false);
          toast.error("Message could not be sent.");
        }
      });
    }
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="ticket details">
              {data?.breadcrumb.map((item, index) => (
                <Item key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </Item>
              ))}
            </Breadcrumb>
          </CardLayout>
        </Col>
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="ticket conversation" dotsMenu={data?.dotsMenu} />
            <Box className="mc-shop-group">
              <Box className="mc-user-profile">
                <RoundAvatar
                  src={ticket?.user.avatar}
                  alt={data?.profile.alt}
                  size={data?.profile.size}
                />
                <Col>
                  <Row className="mb-3">
                    <DuelText
                      title={ticket?.subject}
                      descrip={ticket?.createdAt}
                      size={data?.profile.size}
                    />
                  </Row>
                  <Row className="d-flex">
                    <span>
                      {ticket?.status === "open" && (
                        <Text className="mc-table-badge green">{"Open"}</Text>
                      )}
                      {ticket?.verified === "closed" && (
                        <Text className="mc-table-badge red">{"Closed"}</Text>
                      )}
                    </span>
                    <span>
                      {ticket?.priority === "Normal" && (
                        <Text className="mc-table-badge green">{"Normal"}</Text>
                      )}
                      {ticket?.priority === "High" && (
                        <Text className="mc-table-badge red">{"High"}</Text>
                      )}
                      {ticket?.priority === "Urgent" && (
                        <Text className="mc-table-badge red">{"Urgent"}</Text>
                      )}
                    </span>
                  </Row>
                </Col>
              </Box>

              <Box className="mb-4">
                <DivideTitle title="communication" className="mb-4" />
                <List className="mc-user-metalist">
                  {ticket?.message.map((msg, index) => (
                    <Item key={index}>
                      {msg.sender === adminId ? (
                        <RoundAvatar
                          src="/images/logo/icon.png"
                          alt={data?.profile.alt}
                          size="sm"
                        />
                      ) : (
                        <RoundAvatar
                          src={ticket?.user.avatar}
                          alt={data?.profile.alt}
                          size="sm"
                        />
                      )}
                      <Text as="span">{msg.message}</Text>
                    </Item>
                  ))}
                </List>
              </Box>
              <Col xl={12}>
                <textarea
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={"Type here..."}
                  className={`mc-label-field-textarea ${"w-100 h-text-md"}`}
                ></textarea>
                <Button className="mc-btn primary mt-4" onClick={handleSendMsg}>
                  {loading ? (
                    <PulseLoader color="#fff" size={8} />
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Col>
            </Box>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
