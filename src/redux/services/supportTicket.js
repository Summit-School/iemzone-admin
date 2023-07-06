import axios from "axios";

const URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/support-ticket`;

const getAllTickets = async () => {
  const response = await axios.get(`${URL}/support-tickets`);
  return response.data;
};

const getSingleTicket = async (data) => {
  const response = await axios.get(`${URL}/single-ticket/${data.ticketId}`);
  return response.data;
};

const sendTicketMsg = async (data) => {
  const response = await axios.put(
    `${URL}/send-ticket-message/${data.ticketId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const updateTicketStatus = async (data) => {
  const response = await axios.put(
    `${URL}/update-ticket-status/${data.ticketId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const shopServices = {
  getAllTickets,
  sendTicketMsg,
  getSingleTicket,
  updateTicketStatus,
};

export default shopServices;
