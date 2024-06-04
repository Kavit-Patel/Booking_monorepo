declare interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  callback_url: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

declare class Razorpay {
  constructor(options: RazorpayOptions);
  open(): void;
}

interface Window {
  Razorpay: typeof Razorpay;
}
