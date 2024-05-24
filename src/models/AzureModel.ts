import {
  cloudRunModel,
  artifactRegistryModel,
  genAILanguageModel,
} from './GcpModel';

// pricing
// """
// Unit: USD
// Region: Southeast Asia
// """

export class containerAppsModel extends cloudRunModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/container-apps/#pricing
  // """

  // cost
  vCPUSecond = 0.000034;
  memorySecond = 0.000004;
  requestMillion = 0.4;
}

export class containerRegistryModel extends artifactRegistryModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/container-registry/#pricing
  // """

  storagePerGBMonth = 0.667;
}

export class blobStorageModel extends containerRegistryModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/storage/blobs/#pricing
  // Standard
  // """

  // cost
  storagePerGBMonth = 0.02;
}

export class openAIModel extends genAILanguageModel {
  // """
  // https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/#pricing
  // GPT-3.5-Turbo-0125
  // """

  // cost
  inputPerThousandCharacter = 0.0005;
  outputPerThousandCharacter = 0.0015;
}
