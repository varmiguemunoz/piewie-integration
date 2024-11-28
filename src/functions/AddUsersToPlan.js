import MemberStackService from '../memberstack/memberstack.service.js';

exports.handler = async (event) => {
  try {
    const memberStackService = new MemberStackService(
      process.env.MEMBERSTACK_PRIVATE_KEY
    );

    const { memberId, planId } = JSON.parse(event.body);

    const response = await memberStackService.addMemberToPlan(memberId, planId);

    return {
      statusCode: 200,
      body: JSON.stringify({ response: response }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
