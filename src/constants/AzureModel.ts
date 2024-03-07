import { cloudRun } from './GcpModel';

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
