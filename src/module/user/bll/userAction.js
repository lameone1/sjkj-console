/**
 * Created by shi.pengyan on 2016-12-29.
 */

import http from '../../../common/httpUtil';
import * as types from './userMutationTypes';

const actions = {

  queryUser({ commit }, { userId } = {}) {
    //commit(types.USER_QUERY_USER_BEGIN);

    return http.get(`sys/user/${userId}`).then(user => {
      //commit(types.USER_QUERY_USER_SUC, {user});
      return user;
    })
  },

  queryUsers ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.USER_QUERY_USERS_BEGIN);

    return http.get(`sys/user/users?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(users => {
        commit(types.USER_QUERY_USERS_SUC, {users});
      })
  },
  queryUsersCount ({ commit }) {
    commit(types.USER_QUERY_USERS_TOTALCOUNT_BEGIN);

    return http.get('sys/user/usersCount').then(totalCount => {
      commit(types.USER_QUERY_USERS_TOTALCOUNT_SUC, {totalCount})
    })
  },

  saveUser({ commit }, user) {
    return http.post('sys/user/add', user).then(() => {
      commit(types.USER_ADD_SUC)
    });
  },

  updateUser({ commit }, user) {
    return http.post('sys/user/update', user).then(() => {
      commit(types.USER_UPDATE_SUC)
    });
  },

  deleteUser({ commit }, { userId } = {}) {
    commit(types.USER_DELETE_BEGIN);

    return http.get(`sys/user/delete?userId=${userId}`).then(() => {
      commit(types.USER_DELETE_SUC, {userId});
    });
  },

  lockUser({ commit }, { userId } = {}) {
    return http.get(`sys/user/lock/${userId}`).then(() => {
      commit(types.USER_LOCK_SUC, {userId});
    })
  },

  unlockUser({ commit }, { userId } = {}) {
    return http.get(`sys/user/unlock/${userId}`).then(() => {
      commit(types.USER_UNLOCK_SUC, {userId});
    })
  },

  resetPwd({ commit }, { userId } = {}) {
    return http.get(`sys/user/resetPwd/${userId}`);
  },

  queryUserRoleList({ commit }, { userId } = {}) {
    commit(types.USER_USERROLE_QUERY_BEGIN);

    return http.get(`sys/role/userrole/${userId}`).then(userRoleList => {
      commit(types.USER_USERROLE_QUERY_SUC, {userRoleList});
    });
  },

  queryUserPrivList({ commit }, { userId }) {
    commit(types.USER_USERPRIV_QUERY_BEGIN);

    return http.get(`sys/priv/userpriv/${userId}`).then(userPrivList => {
      commit(types.USER_USERPRIV_QUERY_SUC, {userPrivList});
    });
  },
  queryUserlists({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['page'] = pageIndex;
    conditions['size'] = pageSize;
    commit(types.USER_LIST_QUERY_BEGIN);

    return http.postJSONRaw(`api/console/user/list`, conditions)
      .then(userLists => {
        commit(types.USER_LIST_QUERY_SUC, {userLists});
      })
  },

  userLock({ commit }, userId) {
    return http.postRaw(`api/console/user/lock`, userId).then(data => {

    });
  },

  userUnlock({ commit }, userId) {
    return http.postRaw(`api/console/user/unlock`, userId).then(data => {

    });
  }

};


export default actions;
