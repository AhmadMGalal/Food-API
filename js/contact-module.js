export class ContactForm {
  constructor() {
    this.btn = $('#contactBtn');
    this.btn.prop('disabled', true);
    this.flags = [0, 0, 0, 0, 0, 0];
    // no of inputs to check all items are ok
    document.getElementById('userName').addEventListener('input', () => {
      this.checkInputs('userName', 'name', 'nameAlert', 0);
    });
    document.getElementById('useremail').addEventListener('input', () => {
      this.checkInputs('useremail', 'email', 'emailAlert', 1);
    });
    document.getElementById('usernumber').addEventListener('input', () => {
      this.checkInputs('usernumber', 'number', 'numberAlert', 2);
    });
    document.getElementById('userAge').addEventListener('input', () => {
      this.checkInputs('userAge', 'age', 'ageAlert', 3);
    });
    document.getElementById('userPass').addEventListener('input', () => {
      this.checkInputs('userPass', 'password', 'passAlert', 4);
    });
    this.repass = document.getElementById('repass');
    this.repass.addEventListener('input', () => {
      let pass = document.getElementById('userPass').value;
      if (this.repass.value === pass) {
        document.getElementById('repassAlert').classList.add('d-none');
        this.flags[5] = 1;
        if (!this.flags.includes(0)) {
          this.btn.prop('disabled', false);
        } else {
          this.btn.prop('disabled', true);
        }
      } else {
        document.getElementById('repassAlert').classList.remove('d-none');
        this.flags[5] = 0;
      }
    });
  }

  checkInputs(inputID, regexKey, alertID, f) {
    console.log(inputID);
    let regex = {
      name: /^[a-zA-Z]{1,}$/,
      email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      number: /^(\+|(00))?\d{11,12}$/,
      age: /^([2-9][0-9])|18|19$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };
    let input = document.getElementById(inputID);
    if (regex[regexKey].test(input.value)) {
      document.getElementById(alertID).classList.add('d-none');
      this.flags[f] = 1;
    } else {
      document.getElementById(alertID).classList.remove('d-none');
      this.flags[f] = 0;
    }
    if (!this.flags.includes(0)) {
      this.btn.prop('disabled', false);
    } else {
      this.btn.prop('disabled', true);
    }
  }
}
