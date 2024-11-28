import memberstackAdmin from '@memberstack/admin';

export default class MemberStackService {
  constructor(apiKey) {
    this.memberstack = memberstackAdmin.init(apiKey);
  }

  async addMemberToPlan(memberId, planId) {
    try {
      const response = await this.memberstack.members.addSubscription({
        id: memberId,
        data: {
          planId: planId,
        },
      });
      return response;
    } catch (error) {
      throw new Error('Error adding plan to Memberstack');
    }
  }
}
