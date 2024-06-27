const ldap = require('ldapjs');

class User {
  static async login(username, password) {
    const client = ldap.createClient({
      url: 'ldap://your-ldap-server.com' // Replace with your LDAP server URL
    });

    const dn = `uid=${username},ou=users,dc=example,dc=com`; // Replace with your LDAP DN format
    const options = {
      filter: `(uid=${username})`,
      scope: 'sub',
      attributes: ['user_id', 'username', 'email', 'phone', 'department', 'faculty', 'role', 'image']
    };

    return new Promise((resolve, reject) => {
      client.bind(dn, password, (err) => {
        if (err) {
          reject(new Error('Invalid credentials'));
          return;
        }

        client.search(dn, options, (err, res) => {
          if (err) {
            reject(err);
            return;
          }

          let user = null;
          res.on('searchEntry', (entry) => {
            user = entry.object;
          });

          res.on('end', (result) => {
            client.unbind();
            if (result.status !== 0 || !user) {
              reject(new Error('Invalid credentials'));
              return;
            }
            resolve(user);
          });

          res.on('error', (err) => {
            client.unbind();
            reject(err);
          });
        });
      });
    });
  }
}

module.exports = User;
