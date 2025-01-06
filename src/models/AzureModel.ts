import { CloudRunModel, ArtifactRegistryModel } from './GcpModel'

// pricing
// """
// Unit: USD
// Region: Southeast Asia
// """

export class ContainerAppsModel extends CloudRunModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/container-apps/#pricing
  // """

  constructor(
    vCPURequest: number,
    memoryRequest: number,
    executionTimePerRequestMS: number,
    requestsPerMonth: number,
  ) {
    super(vCPURequest, memoryRequest, executionTimePerRequestMS, requestsPerMonth)

    this.vCPUSecond = 0.000034
    this.memorySecond = 0.000004
    this.requestMillion = 0.4
  }
}

export class ContainerRegistryModel extends ArtifactRegistryModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/container-registry/#pricing
  // """

  constructor(storageGB: number) {
    super(storageGB)

    if (this.storageGB <= 10) {
      this.storagePerGBMonth = 0.167
    } else {
      this.storagePerGBMonth = 0.667
    }
  }
}

export class BlobStorageModel extends ContainerRegistryModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/storage/blobs/#pricing
  // Standard
  // """

  constructor(storageGB: number) {
    super(storageGB)

    this.storagePerGBMonth = 0.02
  }
}
