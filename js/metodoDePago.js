const CLIENT_ID = 'AbcGE2p-paohn8xb45_dnnuDt2Ey0-ysM4P-aYpE_ht-xGU-f6BXXMoDsIsnjRFCO3Rp5XDsSR97rzpE';
const SECRET = 'EIoOvSgnynwcankQ-qU5dDbOWYqibIXRru089mHsbRq-zBWUWQk7YK5dZ-3Z7acYtt_mv323S9q38nw8';

async function createPayment() {
    const fullName = document.getElementById("full-name").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const appointmentDate = document.getElementById("appointment-date").value;
    const service = document.getElementById("service").value;
    const comments = document.getElementById("comments").value || "Sin comentarios.";
    const paymentMethod = document.getElementById("payment-method").value;

    const servicePrices = {
        relajacion: 50,
        facial: 30,
        reductivo: 60,
        acupuntura: 40,
    };

    const serviceName = {
        relajacion: "Masaje de Relajación",
        facial: "Limpieza Facial",
        reductivo: "Masaje Reductivo",
        acupuntura: "Acupuntura",
    };

    const price = servicePrices[service] || 0;

    const response = await fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${SECRET}`)
        },
        body: JSON.stringify({
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            transactions: [{
                amount: {
                    total: price.toFixed(2),
                    currency: 'USD'
                },
                description: `Pago por ${serviceName[service]} - Yao Shih Spa`
            }],
            redirect_urls: {
                return_url: `http://127.0.0.1:5500/invoice.html?` +
                            `payerName=${encodeURIComponent(fullName)}` +
                            `&phoneNumber=${encodeURIComponent(phoneNumber)}` +
                            `&email=${encodeURIComponent(email)}` +
                            `&appointmentDate=${encodeURIComponent(appointmentDate)}` +
                            `&service=${encodeURIComponent(serviceName[service])}` +
                            `&comments=${encodeURIComponent(comments)}` +
                            `&paymentMethod=${encodeURIComponent(paymentMethod)}` +
                            `&price=${price.toFixed(2)}`,
                cancel_url: 'http://127.0.0.1:5500/reservations.html'
            }
        })
    });

    const data = await response.json();
    if (data.links) {
        const approvalUrl = data.links.find(link => link.rel === 'approval_url').href;
        window.location.href = approvalUrl;
    } else {
        console.error('Error al crear el pago:', data);
    }
}

document.getElementById('button-reservar').addEventListener('click', createPayment);
