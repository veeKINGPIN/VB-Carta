const PromiseImpl = function (cb) {
	const self = this;
	self.thens = [];
	self.error = () => {};

	self.then = function (resolve) {
		self.thens.push(resolve);
		return self;
	};

	self.catch = function (reject) {
		self.error = reject;
		return self;
	};

	self.onResolve = function (value) {
		let passedValue = value;

		try {
			self.thens.forEach((thenHandler) => {
				// This is where the magic happens.
				// Every handler takes the value of the previous handler and pass it forward.
				passedValue = thenHandler(passedValue);
			});
		} catch (error) {
			self.thens = [];
			self.onReject(error);
		}
	};

	self.onReject = function (error) {
		self.error(error);
	};

	// You want to call the main execution here with some functions
	// What do these functions do?
	// One needs to run after the main execution is done...take the main's result and pass it down to the list of thens
	// 		How can one do that? Basically take the result, do something, and then call the next function (then handler)
	//		A function of course! That is where we come up with onResolve.
	//				It takes the main's result,
	//				Does something with it (save it in like a global variable. This will keep changing as we down the then handlers, hence we only need one global variable)
	//				And calls the next function (then handler from list of thens)
	// The second needs to run if the main execution fails...aka take the error and call self.error
	cb(self.onResolve, self.onReject);
};

const promise = new PromiseImpl((resolve, reject) => {
	setTimeout(() => {
		try {
			console.log("Hi from inside promise!");
			resolve("Hi from resolved promise!");
		} catch (error) {
			reject(error);
		}
	}, 3000);
});

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		try {
// 			console.log("Hi from inside promise!");
// 			resolve("Hi from resolved promise!");
// 		} catch (error) {
// 			reject(error);
// 		}
// 	}, 3000);
// });

promise
	.then((result) => {
		console.log(result);
	})
	.then(() => {
		console.log("Hi from Next");
	});
