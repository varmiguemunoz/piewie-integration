import Stripe from 'stripe';

export default class StripeService {
  constructor(secretKey) {
    this.stripe = Stripe(secretKey);
  }

  async createPaymentGateway(planId, memberId) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: planId, // ID del precio configurado en Stripe
            quantity: 1,
          },
        ],
        success_url: `https://www.piewire.live//confirm-email?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://www.piewire.live/checkout`,
        metadata: {
          memberId: memberId, // Metadatos adicionales
        },
      });

      return session;
    } catch (error) {
      throw new Error(error);
    }
  }


  async getPaymentSession(sessionId) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }
}
