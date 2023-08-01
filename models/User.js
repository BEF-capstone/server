/* User Authentication Model */
const bcrypt = require("bcrypt");
// Database management
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const config = require("../config");
// Error handlers
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  /**
   * CREATE an entry with public user information
   * @param {Object} user
   * @returns publicUser
   */
  static publicUser(user) {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  }

  /**
   * READ and confirm that creds match user
   * @param {Object} creds
   * @returns publicUser
   */
  static login = async (creds) => {
    const { email, password } = creds;
    const userExists = await this.fetchUserByEmail(email);
    if (userExists) {
      const validPasswords = await bcrypt.compare(
        password,
        userExists.password
      );
      if (validPasswords === true) {
        return User.publicUser(userExists);
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  };

  /**
   * CREATE a new user in the users table if valid input
   * @param {Object} creds
   * @returns user
   */
  static register = async (creds) => {
    const { email, firstname, lastname, password } = creds;
    // check if email exists in database
    const existingUserEmail = await User.fetchUserByEmail(email);
    if (existingUserEmail)
      throw new BadRequestError(`Duplicate Email: ${email}`);

    // hash user password
    const saltRounds = config.BCRYPT_WORK_FACTOR;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const normalizedEmail = email.toLowerCase();

    // create a new user in the user table using prisma-create
    const newUser = await prisma.User.create({
      data: {
        email: normalizedEmail,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      },
    });

    return User.publicUser(newUser);
  };

  /**
   * find user by email in the users table
   * @param {String} email
   * @returns user
   */
  static fetchUserByEmail = async (email) => {
    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  };
}

module.exports = User;
