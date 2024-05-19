// pricing
// """
// Unit: USD
// Region: asia-southeast1
// """

export class quotationProjectManager {
  salary = 100000;
  mandayRatio = 0.3;
  mandayWeeks = 4;

  constructor(salary: number, mandayRatio: number, mandayWeeks: number) {
    this.salary = salary;
    this.mandayRatio = mandayRatio;
    this.mandayWeeks = mandayWeeks;
  }

  cost() {
    const costManday = this.salary / 30;
    const days = this.mandayWeeks * this.mandayRatio * 7;

    return costManday * days;
  }
}

export class quotationDev {
  salary = 100000;
  mandayWeeks = 4;

  constructor(salary: number, mandayWeeks: number) {
    this.salary = salary;
    this.mandayWeeks = mandayWeeks;
  }

  cost() {
    const costManday = this.salary / 30;
    const days = this.mandayWeeks * 7;

    return costManday * days;
  }
}
