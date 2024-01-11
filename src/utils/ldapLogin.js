const ldap = require("ldapjs");

function validateLdapUser(username, password) {
    return new Promise((resolve, reject) => {
        const client = ldap.createClient({
            url: ["ldap://172.16.1.98", "ldap://172.16.1.87"],
        });

        client.bind(
            `uid=${username},ou=people,dc=mnit,dc=ac,dc=in`,
            password,
            (err) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else {
                    console.log("Authenticated");
                    resolve(true);
                }
                client.unbind(); // Don't forget to unbind the client when done.
            }
        );
    });
}
module.exports = { validateLdapUser };