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

export class artifactRegistry {
  // """
  // https://cloud.google.com/artifact-registry/pricing
  // """

  // cost
  storagePerGBMonth = 0.1;

  // user's input
  storageGB = 1;

  constructor(storageGB: number) {
    this.storageGB = storageGB;
  }

  cost() {
    return this.storagePerGBMonth * this.storageGB;
  }
}

export class cloudStorage extends artifactRegistry {
  // """
  // https://cloud.google.com/storage/pricing
  // """

  // cost
  storagePerGBMonth = 0.02;
}

export class genAILanguage {
  // """
  // https://cloud.google.com/vertex-ai/docs/generative-ai/pricing
  // PaLM 2 for Text
  // """

  // cost
  inputPerThousandCharacter = 0.00025;
  outputPerThousandCharacter = 0.0005;

  // user's input
  requestsPerMonth = 20000;
  avgInputCharacter = 1000;
  avgOutputCharacter = 2000;

  constructor(
    requestsPerMonth: number,
    avgInputCharacter: number,
    avgOutputCharacter: number
  ) {
    this.requestsPerMonth = requestsPerMonth;
    this.avgInputCharacter = avgInputCharacter;
    this.avgOutputCharacter = avgOutputCharacter;
  }

  cost() {
    const costPerRequest =
      (this.inputPerThousandCharacter * this.avgInputCharacter) / 1000 +
      (this.outputPerThousandCharacter * this.avgOutputCharacter) / 1000;

    return costPerRequest * this.requestsPerMonth;
  }
}
