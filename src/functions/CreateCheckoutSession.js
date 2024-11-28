import StripeCheckoutService from '../stripe/stripe.service.js';

exports.handler = async (event) => {
  try {
    const stripeService = new StripeCheckoutService(
      process.env.STRIPE_PRIVATE_KEY
    );

    const { planId, memberId } = JSON.parse(event.body);

    const session = await stripeService.createCheckoutSession(planId, memberId);

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
