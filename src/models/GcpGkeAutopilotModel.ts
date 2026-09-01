import { GcpGkeAutopilotCost } from 'src/utils/CloudCost'

export class GeneralPurposeModel {
  vCPU: number
  memory: number

  cpuRegular = parseFloat(GcpGkeAutopilotCost.generalPurpose.cpuRegular)
  memoryRegular = parseFloat(GcpGkeAutopilotCost.generalPurpose.memoryRegular)
  cpuSpot = parseFloat(GcpGkeAutopilotCost.generalPurpose.cpuSpot)
  memorySpot = parseFloat(GcpGkeAutopilotCost.generalPurpose.memorySpot)
  // cpuOneYearCommitment = 0.04392
  // memoryOneYearCommitment = 0.0048583
  // cpuThreeYearCommitment = 0.030195
  // memoryThreeYearCommitment = 0.0033401

  constructor(vCPU: number, memory: number) {
    this.vCPU = vCPU
    this.memory = memory
  }

  costRegular() {
    // console.log(this.cpuRegular)
    return this.vCPU * this.cpuRegular + this.memory * this.memoryRegular
  }

  costSpot() {
    return this.vCPU * this.cpuSpot + this.memory * this.memorySpot
  }

  // costOneYearCommitment() {
  //   return this.vCPU * this.cpuOneYearCommitment + this.memory * this.memoryOneYearCommitment
  // }
  //
  // costThreeYearCommitment() {
  //   return this.vCPU * this.cpuThreeYearCommitment + this.memory * this.memoryThreeYearCommitment
  // }

  pricing() {
    return [
      this.costRegular(),
      this.costSpot(),
      // this.costOneYearCommitment(),
      // this.costThreeYearCommitment(),
    ]
  }
}

export class ScaleOutARMModel extends GeneralPurposeModel {
  constructor(vCPU: number, memory: number) {
    super(vCPU, memory)

    this.cpuRegular = parseFloat(GcpGkeAutopilotCost.scaleOutARM.cpuRegular)
    this.memoryRegular = parseFloat(GcpGkeAutopilotCost.scaleOutARM.memoryRegular)
    this.cpuSpot = parseFloat(GcpGkeAutopilotCost.scaleOutARM.cpuSpot)
    this.memorySpot = parseFloat(GcpGkeAutopilotCost.scaleOutARM.memorySpot)
    // this.cpuOneYearCommitment = 0.03512
    // this.memoryOneYearCommitment = 0.0038866
    // this.cpuThreeYearCommitment = 0.024145
    // this.memoryThreeYearCommitment = 0.0026721
    this.vCPU = vCPU
    this.memory = memory
  }
}

export class ScaleOutX86Model extends GeneralPurposeModel {
  constructor(vCPU: number, memory: number) {
    super(vCPU, memory)

    this.cpuRegular = parseFloat(GcpGkeAutopilotCost.scaleOutX86.cpuRegular)
    this.memoryRegular = parseFloat(GcpGkeAutopilotCost.scaleOutX86.memoryRegular)
    this.cpuSpot = parseFloat(GcpGkeAutopilotCost.scaleOutX86.cpuSpot)
    this.memorySpot = parseFloat(GcpGkeAutopilotCost.scaleOutX86.memorySpot)
    // this.cpuOneYearCommitment = 0.05536
    // this.memoryOneYearCommitment = 0.00612144
    // this.cpuThreeYearCommitment = 0.03806
    // this.memoryThreeYearCommitment = 0.0042085
    this.vCPU = vCPU
    this.memory = memory
  }
}
