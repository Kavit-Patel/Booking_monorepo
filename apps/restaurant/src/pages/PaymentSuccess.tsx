import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const param = useParams();
  return <div>PaymentSuccess:${param.reference}</div>;
};

export default PaymentSuccess;
