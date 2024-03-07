// pricing
// """
// Unit: USD
// Region: asia-southeast1
// """

export class cloudRun {
  // """
  // https://cloud.google.com/compute/all-pricing
  // """

  // cost
  vCPUSecond = 0.0000336;
  memorySecond = 0.0000035;
  requestMillion = 0.4;

  // user's input
  vCPURequest = 1.0;
  memoryRequest = 1.0;
  executionTimePerRequestMS = 50;
  requestsPerMonth = 10000;

  constructor(
    vCPURequest: number,
    memoryRequest: number,
    executionTimePerRequestMS: number,
    requestsPerMonth: number
  ) {
    this.vCPURequest = vCPURequest;
    this.memoryRequest = memoryRequest;
    this.executionTimePerRequestMS = executionTimePerRequestMS;
    this.requestsPerMonth = requestsPerMonth;
  }

  cost() {
    const executionTimeSecond =
      (this.executionTimePerRequestMS * this.requestsPerMonth) / 1000;
    const costCPU = this.vCPURequest * this.vCPUSecond * executionTimeSecond;
    const costMemory =
      this.memoryRequest * this.memorySecond * executionTimeSecond;

    return costCPU + costMemory;
  }
}
