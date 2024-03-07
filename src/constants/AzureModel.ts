import { cloudRun, artifactRegistry } from './GcpModel';

// pricing
// """
// Unit: USD
// Region: Southeast Asia
// """

export class containerApps extends cloudRun {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/container-apps/#pricing
  // """

  // cost
  vCPUSecond = 0.000034;
  memorySecond = 0.000004;
  requestMillion = 0.4;
}

export class containerRegistry extends artifactRegistry {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/container-registry/#pricing
  // """

  storagePerGBMonth = 0.667;
}

export class blobStorage extends containerRegistry {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/storage/blobs/#pricing
  // Standard
  // """

  // cost
  storagePerGBMonth = 0.02;
}
