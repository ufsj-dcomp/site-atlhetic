import emailjs from "@emailjs/browser";

export const sendPurchaseEmail = (
  userEmail: string,
  userName: string,
  orderId: string,
  paymentMethod: string,
  total: number
) => {
  return emailjs.send(
    "service_xx5ellj",
    "template_30dq8kr",
    {
      user_email: userEmail,
      user_name: userName,
      order_id: orderId,
      payment_method: paymentMethod,
      total: total,
    },
    "2wiy33ZJ10i_KyBNJ"
  );
};