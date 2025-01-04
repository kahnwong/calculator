export class ProjectQuotationModel {
  salary = 100000
  mandayUnit = 1
  durationWeeks = 4

  constructor(salary: number, mandayUnit: number, durationWeeks: number) {
    this.salary = salary
    this.mandayUnit = mandayUnit
    this.durationWeeks = durationWeeks
  }

  cost() {
    const costManday = this.salary / 30
    const days = this.durationWeeks * this.mandayUnit * 7

    return costManday * days
  }
}
