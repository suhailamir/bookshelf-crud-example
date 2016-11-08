describe('testing users query', () => {
	const User = require('./user');

	it('should return an array of users', () => {
		User.fetchAll()
			.then(users => {
				expect(users).toBeInstanceOf(Array);
			})
	});
});
