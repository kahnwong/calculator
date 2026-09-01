import { ArtifactRegistryModel } from './GcpModel'
import { CloudCost } from 'src/utils/CloudCost'

export class EcsFargateModel {
  // cost
  vCPUHour = parseFloat(CloudCost.aws.containerCpu)
  memorySecond = parseFloat(CloudCost.aws.containerMemory)

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
  constructor(storageGB: number) {
    super(storageGB)

    this.storagePerGBMonth = parseFloat(CloudCost.aws.containerRegistryStorage)
  }
}

export class S3Model extends EcrModel {
  constructor(storageGB: number) {
    super(storageGB)

    this.storagePerGBMonth = parseFloat(CloudCost.aws.storage)
  }
}
