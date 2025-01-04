// pricing
// """
// Ref: https://cloud.google.com/kubernetes-engine/pricing
// Unit: USD
// Price: per hour
// Region: asia-southeast1
// """

export class GeneralPurposeModel {
  vCPU: number
  memory: number

  cpuRegular = 0.0549
  memoryRegular = 0.0060729
  cpuSpot = 0.0165
  memorySpot = 0.0018219
  cpuOneYearCommitment = 0.04392
  memoryOneYearCommitment = 0.0048583
  cpuThreeYearCommitment = 0.030195
  memoryThreeYearCommitment = 0.0033401

  constructor(vCPU: number, memory: number) {
    this.vCPU = vCPU
    this.memory = memory
  }

  costRegular() {
    return this.vCPU * this.cpuRegular + this.memory * this.memoryRegular
  }

  costSpot() {
    return this.vCPU * this.cpuSpot + this.memory * this.memorySpot
  }

  costOneYearCommitment() {
    return this.vCPU * this.cpuOneYearCommitment + this.memory * this.memoryOneYearCommitment
  }

  costThreeYearCommitment() {
    return this.vCPU * this.cpuThreeYearCommitment + this.memory * this.memoryThreeYearCommitment
  }

  pricing() {
    return [
      this.costRegular(),
      this.costSpot(),
      this.costOneYearCommitment(),
      this.costThreeYearCommitment(),
    ]
  }
}

export class ScaleOutARMModel extends GeneralPurposeModel {
  constructor(vCPU: number, memory: number) {
    super(vCPU, memory)

    this.cpuRegular = 0.0439
    this.memoryRegular = 0.0048583
    this.cpuSpot = 0.0132
    this.memorySpot = 0.0014575
    this.cpuOneYearCommitment = 0.03512
    this.memoryOneYearCommitment = 0.0038866
    this.cpuThreeYearCommitment = 0.024145
    this.memoryThreeYearCommitment = 0.0026721
    this.vCPU = vCPU
    this.memory = memory
  }
}

export class ScaleOutX86Model extends GeneralPurposeModel {
  constructor(vCPU: number, memory: number) {
    super(vCPU, memory)

    this.cpuRegular = 0.0692
    this.memoryRegular = 0.0076518
    this.cpuSpot = 0.0208
    this.memorySpot = 0.0022956
    this.cpuOneYearCommitment = 0.05536
    this.memoryOneYearCommitment = 0.00612144
    this.cpuThreeYearCommitment = 0.03806
    this.memoryThreeYearCommitment = 0.0042085
    this.vCPU = vCPU
    this.memory = memory
  }
}
