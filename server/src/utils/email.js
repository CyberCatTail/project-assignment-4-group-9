const nodemailer = require("nodemailer");
const constants = require('@root/constants');

function ParsePrice(price){
  const amount = parseFloat(price) / 100;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(amount)
  return formatted;
}

const transport = nodemailer.createTransport({
  host: "smtp.163.com",
  port: 465,
  secure: true,
  auth: {
    user: constants.EMAIL_USER,
    pass: constants.EMAIL_PASSWORD
  }
});

transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const generateOrder = (order) => {
  let htmlContent = `
  <html>
  <head>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      td {
        text-align: right;
      }
    </style>
  </head>
  <body>
    <h2>Order Bill</h2>
    <p><strong>Order ID:</strong> ${order.order_id}</p>
    
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>`;

  order.products.forEach(product => {
    htmlContent += `
    <tr>
      <td>${product.brand} ${product.model}</td>
      <td>${product.quantity}</td>
      <td>${ParsePrice(product.price)}</td>
    </tr>`;
  });

  htmlContent += `
      </tbody>
    </table>

    <p><strong>Total Price:</strong> ${ParsePrice(order.total_price)}</p>
    <p><strong>Paid By Card:</strong> ${order.payment.card}</p>
  </body>
  </html>
`;
  return htmlContent
}

const sample = {
  order_id: 1,
  products : [
    {
      brand: 'Apple',
      model: 'Mac',
      quantity: 5,
      price: 1000.31
    },
    {
      brand: 'Dell',
      model: 'Xps',
      quantity: 1,
      price: 2.31
    }
  ],
  total_price: 11111.03,
  payment: {
    card: 32138901839018
  }
}

exports.sendOrder = (order, toEmail) => {
  const content = generateOrder(order)
  const mailOptions = {
    from: constants.EMAIL_USER,
    to: toEmail,
    subject: "BeastBuy Order Receipt",
    html: content,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
}