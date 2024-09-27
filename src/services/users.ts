export default class Users {
    validateUserName(username: string) {
        if(!username) {
            throw new Error ('Username is required')
        }

        if(username.length > 10) {
            throw new Error('Username too lengthy');
        };
    }

    validatePassword(password: string) {
        if(!password) {
            throw new Error ('Password is required');
        }

        if(password.length > 8) {
            throw new Error('Password too lengthy');
        };
    }

    validateEmail(email: string) {
        if(!email) {
            throw new Error ('Email is required');
        }
    }


    public createUser = async (payload: any) => {
        this.validateUserName(payload.username);
        this.validatePassword(payload.password);
        this.validateEmail(payload.email);
    };
}