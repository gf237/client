/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.creationDate = null;
    this.birthDate = null;
    this.token = null;
    Object.assign(this, data);
  }
}

export default User;
