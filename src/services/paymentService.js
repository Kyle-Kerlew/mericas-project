const isProduction = import.meta.env.VITE_SQUARE_ENVIRONMENT === 'production';
const squareBaseUrl = isProduction
    ? (import.meta.env.VITE_SQUARE_API_URL_V2_PRODUCTION || import.meta.env.VITE_SQUARE_API_URL_V2_SANDBOX)
    : '/api';
const token = isProduction
    ? import.meta.env.VITE_SQUARE_API_KEY_PRODUCTION_TOKEN
    : import.meta.env.VITE_SQUARE_API_KEY_SANDBOX_TOKEN;

if (!token) {
    throw new Error('Missing Square API token in Vite env vars');
}

const accessToken = token;

async function squareApiRequest(path, method = 'GET', body) {
    const url = `${squareBaseUrl}${path}`;
    const options = {
        method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Square-Version': import.meta.env.VITE_SQUARE_API_VERSION,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data?.errors?.map((error) => error.detail || error.category || error.code).join(', ') || response.statusText;
        const error = new Error(`Square API error: ${errorMessage}`);
        error.response = data;
        throw error;
    }

    return data;
}

function getOrderConfirmationUrl(confirmationNumber) {
    const base = import.meta.env.VITE_ORDER_CONFIRMATION_BASE_URL || 'http://localhost:5173/order-confirmation';
    return `${base}?confirmation=${encodeURIComponent(confirmationNumber)}`;
}

function listLocations() {
    return squareApiRequest('/v2/locations');
}
async function createPaymentLink({ amount, items }) {
    const idempotencyKey = crypto.randomUUID();
    console.log("amount: ", amount);
    console.log("items: ", items);
    const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;
    const body = {
        idempotency_key: idempotencyKey,
        checkout_options: {
            redirect_url: getOrderConfirmationUrl(idempotencyKey),
            allow_tipping: true,
        },
        order: {
            location_id: locationId,

            line_items: items.map((item) => ({
                name: item.name,

                quantity: String(item.quantity),
                base_price_money: {
                    amount: convertToCents(item.price),
                    currency: 'USD',
                },
            })),
        },
        amount_money: {
            amount,
            currency: 'USD',
        }
    };

    const data = await squareApiRequest('/v2/online-checkout/payment-links', 'POST', body);
    return data.payment_link.url;
}

async function getPayment(paymentId) {
    if (!paymentId) {
        throw new Error('getPayment requires paymentId');
    }

    const data = await squareApiRequest(`/v2/payments/${paymentId}`);
    return data.payment;
}

function convertToCents(amount) {
    return Math.round(amount * 100);
}
export default {
    createPaymentLink: createPaymentLink,
    getPayment: getPayment,
    listLocations
};
