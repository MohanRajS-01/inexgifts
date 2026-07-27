export const orders = [
  {
    id: "INEX123456",
    orderNumber: "INEX123456",
    productName: "LED Photo Lamp",
    description: "Personalized with 1 photo",
    price: 999,
    quantity: 1,
    date: "12 May 2025, 10:30 AM",
    status: "Processing", // Badge: Order Placed
    image: "/assets/images/led_lamp.jpg",
    estimatedDelivery: "15 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "UPI (Google Pay)",
    trackingNumber: "TRK9876543210",
    deliveryPartner: "BlueDart",
    timeline: [
      { step: "Confirmed", date: "12 May", time: "10:30 AM", completed: true, active: true },
      { step: "Processing", date: "12 May", time: "04:15 PM", completed: true, active: true },
      { step: "Shipped", date: "13 May", time: "—", completed: false, active: false },
      { step: "Delivered", date: "15 May", time: "—", completed: false, active: false }
    ]
  },
  {
    id: "INEX123455",
    orderNumber: "INEX123455",
    productName: "Photo Cushion",
    description: "Personalized with 6 photos",
    price: 499,
    quantity: 1,
    date: "08 May 2025, 08:15 PM",
    status: "Delivered",
    image: "/assets/images/photo_cushion.jpg",
    deliveredDate: "13 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "Credit Card (Ending in 4321)",
    trackingNumber: "TRK1234567890",
    deliveryPartner: "Delhivery",
    timeline: [
      { step: "Confirmed", date: "08 May", time: "08:15 PM", completed: true, active: true },
      { step: "Processing", date: "09 May", time: "11:00 AM", completed: true, active: true },
      { step: "Shipped", date: "10 May", time: "02:30 PM", completed: true, active: true },
      { step: "Delivered", date: "13 May", time: "04:00 PM", completed: true, active: true }
    ]
  },
  {
    id: "INEX123454",
    orderNumber: "INEX123454",
    productName: "Premium Gift Box",
    description: "Blue Edition",
    price: 1499,
    quantity: 1,
    date: "08 May 2025, 02:45 PM",
    status: "Shipped",
    image: "/assets/images/gift_set.jpg",
    estimatedDelivery: "15 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "Net Banking (HDFC)",
    trackingNumber: "TRK8877665544",
    deliveryPartner: "BlueDart",
    timeline: [
      { step: "Confirmed", date: "08 May", time: "02:45 PM", completed: true, active: true },
      { step: "Processing", date: "08 May", time: "08:00 PM", completed: true, active: true },
      { step: "Shipped", date: "09 May", time: "10:30 AM", completed: true, active: true },
      { step: "Delivered", date: "15 May", time: "—", completed: false, active: false }
    ]
  },
  {
    id: "INEX123453",
    orderNumber: "INEX123453",
    productName: "Wooden Photo Frame",
    description: "Personalized with 2 photos",
    price: 699,
    quantity: 1,
    date: "05 May 2025, 11:20 AM",
    status: "Cancelled",
    image: "/assets/images/photo_frame.jpg",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "UPI (PhonePe)",
    trackingNumber: "—",
    deliveryPartner: "—",
    timeline: [
      { step: "Confirmed", date: "05 May", time: "11:20 AM", completed: true, active: true },
      { step: "Cancelled", date: "05 May", time: "02:00 PM", completed: true, active: true }
    ]
  },
  {
    id: "INEX123452",
    orderNumber: "INEX123452",
    productName: "Personalized Coffee Mug",
    description: "Best Friend Edition",
    price: 399,
    quantity: 1,
    date: "03 May 2025, 09:00 AM",
    status: "Return",
    image: "/assets/images/coffee_mug.jpg",
    returnedDate: "06 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK3344556677",
    deliveryPartner: "Delhivery",
    timeline: [
      { step: "Confirmed", date: "03 May", time: "09:00 AM", completed: true, active: true },
      { step: "Processing", date: "03 May", time: "02:00 PM", completed: true, active: true },
      { step: "Shipped", date: "04 May", time: "10:00 AM", completed: true, active: true },
      { step: "Delivered", date: "05 May", time: "03:00 PM", completed: true, active: true },
      { step: "Return Initiated", date: "05 May", time: "06:00 PM", completed: true, active: true },
      { step: "Returned", date: "06 May", time: "02:00 PM", completed: true, active: true }
    ]
  },
  {
    id: "INEX123451",
    orderNumber: "INEX123451",
    productName: "Photo Keychain",
    description: "Acrylic Square Printed",
    price: 199,
    quantity: 1,
    date: "02 May 2025, 11:30 AM",
    status: "Delivered",
    image: "/assets/images/photo_keychain.jpg",
    deliveredDate: "05 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "UPI (Google Pay)",
    trackingNumber: "TRK1122334455",
    deliveryPartner: "Delhivery",
    timeline: [
      { step: "Confirmed", date: "02 May", time: "11:30 AM", completed: true, active: true },
      { step: "Processing", date: "02 May", time: "03:00 PM", completed: true, active: true },
      { step: "Shipped", date: "03 May", time: "11:00 AM", completed: true, active: true },
      { step: "Delivered", date: "05 May", time: "01:30 PM", completed: true, active: true }
    ]
  },
  {
    id: "INEX123450",
    orderNumber: "INEX123450",
    productName: "Customized Water Bottle",
    description: "Matte Black - Engraved Emma",
    price: 599,
    quantity: 1,
    date: "10 May 2025, 04:00 PM",
    status: "Shipped",
    image: "/assets/images/water_bottle.jpg",
    estimatedDelivery: "14 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "Credit Card (Ending in 9876)",
    trackingNumber: "TRK2233445566",
    deliveryPartner: "BlueDart",
    timeline: [
      { step: "Confirmed", date: "10 May", time: "04:00 PM", completed: true, active: true },
      { step: "Processing", date: "11 May", time: "09:00 AM", completed: true, active: true },
      { step: "Shipped", date: "12 May", time: "02:00 PM", completed: true, active: true },
      { step: "Delivered", date: "14 May", time: "—", completed: false, active: false }
    ]
  },
  {
    id: "INEX123449",
    orderNumber: "INEX123449",
    productName: "Personalized Clock",
    description: "Baby Photo Wooden Dial",
    price: 899,
    quantity: 1,
    date: "13 May 2025, 09:15 AM",
    status: "Processing", // Badge: Order Placed
    image: "/assets/images/personalized_clock.jpg",
    estimatedDelivery: "16 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "UPI (PhonePe)",
    trackingNumber: "TRK3344556677",
    deliveryPartner: "BlueDart",
    timeline: [
      { step: "Confirmed", date: "13 May", time: "09:15 AM", completed: true, active: true },
      { step: "Processing", date: "13 May", time: "02:30 PM", completed: true, active: true },
      { step: "Shipped", date: "14 May", time: "—", completed: false, active: false },
      { step: "Delivered", date: "16 May", time: "—", completed: false, active: false }
    ]
  },
  {
    id: "INEX123448",
    orderNumber: "INEX123448",
    productName: "Name Engraved Pen",
    description: "David Vance Gold Edition",
    price: 299,
    quantity: 1,
    date: "01 May 2025, 10:00 AM",
    status: "Delivered",
    image: "/assets/images/engraved_pen.jpg",
    deliveredDate: "04 May 2025",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK4455667788",
    deliveryPartner: "Delhivery",
    timeline: [
      { step: "Confirmed", date: "01 May", time: "10:00 AM", completed: true, active: true },
      { step: "Processing", date: "01 May", time: "04:00 PM", completed: true, active: true },
      { step: "Shipped", date: "02 May", time: "11:00 AM", completed: true, active: true },
      { step: "Delivered", date: "04 May", time: "03:00 PM", completed: true, active: true }
    ]
  },
  {
    id: "INEX123447",
    orderNumber: "INEX123447",
    productName: "Personalized T-Shirt",
    description: "Retro Landscape Graphic Print",
    price: 499,
    quantity: 1,
    date: "04 May 2025, 03:20 PM",
    status: "Cancelled",
    image: "/assets/images/custom_tshirt.jpg",
    deliveryAddress: {
      name: "John Doe",
      line1: "Flat 405, Block B, Silver Oak Apartments",
      line2: "Sector 48, Sohna Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      phone: "+91 98765 43210"
    },
    paymentMethod: "UPI (Google Pay)",
    trackingNumber: "—",
    deliveryPartner: "—",
    timeline: [
      { step: "Confirmed", date: "04 May", time: "03:20 PM", completed: true, active: true },
      { step: "Cancelled", date: "04 May", time: "05:00 PM", completed: true, active: true }
    ]
  }
];
