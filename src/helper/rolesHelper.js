const { model } = require("mongoose");

/**
 * There are 3 types of users in GuideXP Content Management system.
 * There is a Customer table in the db, but there is no CUSTOMER type user
 * It is to associate MANAGER/STAFF to one customer.
 *
 * GUIDEXP:
 * Guidexp Admin User
 *
 *
 * MANAGER:
 * For each customer, there will be only one MANAGER type user.
 * MANAGER type user has all actions available in his/her disposal, including
 * CREATE, UPDATE, and DELETE exhibit, exhibitions, STAFF-TYPE user.
 * ASSIGN task to STAFF-TYPE user
 *
 * STAFF:
 * There could be multiple STAFF type users for an organization
 * By default, they only have read permission
 * They can be assigned write permission (e.g. Add translation) by MANAGER user to specific contents
 */

const GUIDEXP = 1;
const MANAGER = 2;
const STAFF = 3;

module.exports = {
  GUIDEXP,
  MANAGER,
  STAFF,
};
