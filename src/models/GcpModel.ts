import { CloudCost } from 'src/utils/CloudCost'

export class CloudRunModel {
  // cost
  vCPUSecond = parseFloat(CloudCost.gcp.containerCpu)
  memorySecond = parseFloat(CloudCost.gcp.containerMemory)
  requestMillion = 0.4

  // user's input
  vCPURequest = 1.0
  memoryRequest = 1.0
  executionTimePerRequestMS = 50
  requestsPerMonth = 10000

  constructor(
    vCPURequest: number,
    memoryRequest: number,
    executionTimePerRequestMS: number,
    requestsPerMonth: number,
  ) {
    this.vCPURequest = vCPURequest
    this.memoryRequest = memoryRequest
    this.executionTimePerRequestMS = executionTimePerRequestMS
    this.requestsPerMonth = requestsPerMonth
  }

  cost() {
    const executionTimeSecond = (this.executionTimePerRequestMS * this.requestsPerMonth) / 1000
    const costCPU = this.vCPURequest * this.vCPUSecond * executionTimeSecond
    const costMemory = this.memoryRequest * this.memorySecond * executionTimeSecond

    return costCPU + costMemory
  }
}

export class ArtifactRegistryModel {
  // cost
  storagePerGBMonth = parseFloat(CloudCost.gcp.containerRegistryStorage)

  // user's input
  storageGB = 1

  constructor(storageGB: number) {
    this.storageGB = storageGB
  }

  cost() {
    return this.storagePerGBMonth * this.storageGB
  }
}

export class CloudStorageModel extends ArtifactRegistryModel {
  constructor(storageGB: number) {
    super(storageGB)

    this.storagePerGBMonth = parseFloat(CloudCost.gcp.storage)
  }
}
