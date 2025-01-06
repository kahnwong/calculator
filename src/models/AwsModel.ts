import { ArtifactRegistryModel } from './GcpModel'

// pricing
// """
// Unit: USD
// Region: Southeast Asia
// """

export class EcsFargateModel {
  // """
  // https://aws.amazon.com/fargate/pricing/
  // """

  // cost
  vCPUHour = 0.05056
  memorySecond = 0.00553

  // user's input
  vCPURequest = 0.5
  memoryRequest = 1.0

  constructor(vCPURequest: number, memoryRequest: number) {
    this.vCPURequest = vCPURequest
    this.memoryRequest = memoryRequest
  }

  cost() {
    const costCPU = this.vCPURequest * this.vCPUHour * 24 * 30
    const costMemory = this.memoryRequest * this.memorySecond * 24 * 30

    return costCPU + costMemory
  }
}

export class EcrModel extends ArtifactRegistryModel {
  // """
  // https://aws.amazon.com/ecr/pricing/
  // """

  constructor(storageGB: number) {
    super(storageGB)

    this.storagePerGBMonth = 0.1
  }
}

export class S3Model extends EcrModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/storage/blobs/#pricing
  // Standard
  // """

  constructor(storageGB: number) {
    super(storageGB)

    this.storagePerGBMonth = 0.025
  }
}
