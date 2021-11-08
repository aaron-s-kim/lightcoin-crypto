
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = []; // [ Withdrawal {amount: x, account: {name, t[]}}, Deposit {amount: y}  ]
  }
  get balance() { // get method to calculate sum of transaction objects
    let sum = 0;
    for (let t of this.transactions) {
      sum += t.value;
    }
    return sum;

  }
  addTransaction(transaction) { // method that pushes withdrawal/deposit obj to Account.transactions array
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) { // ex. new Deposit(120, myAccount)
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this); // Add the transaction to the account
    return true;
  }
}
class Withdrawal extends Transaction {
  get value() { return -this.amount };
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}
class Deposit extends Transaction {
  get value() { return this.amount };
  isAllowed() {
    return true;
  }
}


// DRIVER CODE - "drives" the application logic & makes sure it's working as expected

const myAccount = new Account("snow-patrol"); // => Account { username: 'snow-patrol', balance: 0 }
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1); // => Withdrawal { amount: 50.25 }
t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2); // => Withdrawal { amount: 9.99 }
t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3); // => Deposit { amount: 120 }
console.log(myAccount.balance);

console.log(myAccount.transactions[0].amount);

// const myAccount = new Account();

// console.log('Starting Account Balance: ', myAccount.balance);

// console.log('Attempting to withdraw even $1 should fail...');
// const t1 = new Withdrawal(1.00, myAccount);
// console.log('Commit result:', t1.commit());
// console.log('Account Balance: ', myAccount.balance);

// console.log('Depositing should succeed...');
// const t2 = new Deposit(9.99, myAccount);
// console.log('Commit result:', t2.commit());
// console.log('Account Balance: ', myAccount.balance);

// console.log('Withdrawal for 9.99 should be allowed...');
// const t3 = new Withdrawal(9.99, myAccount);
// console.log('Commit result:', t3.commit());

// console.log('Ending Account Balance: ', myAccount.balance);
// console.log("Lookings like I'm broke again");

// console.log('Account Transaction History: ', myAccount.transactions);




