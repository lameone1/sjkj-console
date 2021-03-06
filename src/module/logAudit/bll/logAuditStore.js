/**
 * Created by shi.pengyan on 2017-01-09.
 */
import actions from './logAuditAction';
import mutations from './logAuditMutation';

const state = {
  totalCount: 0,
  logAudits: []
};

const getters = {
  getSysLogAudits: state => state.logAudits,
  getSysLogAuditTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
