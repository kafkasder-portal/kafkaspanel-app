import { Workflow, WorkflowStep, WorkflowResult } from './types';

interface WorkflowExecutionContext {
  userId: string;
  sessionId: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

interface StepExecutionContext {
  stepId: string;
  workflowId: string;
  userId: string;
  sessionId: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
}

export class WorkflowEngine {
  private workflows: Map<string, Workflow> = new Map();
  private executionHistory: WorkflowResult[] = [];
  private maxHistorySize = 1000;

  constructor() {
    this.initializeDefaultWorkflows();
  }

  private initializeDefaultWorkflows(): void {
    // Initialize with some default workflows
    const defaultWorkflows: Workflow[] = [
      {
        id: 'user-onboarding',
        name: 'User Onboarding',
        description: 'Standard user onboarding workflow',
        steps: [
          {
            id: 'create-profile',
            name: 'Create User Profile',
            type: 'CREATE',
            config: { entity: 'user' }
          },
          {
            id: 'assign-role',
            name: 'Assign Default Role',
            type: 'UPDATE',
            config: { entity: 'user', field: 'role' }
          },
          {
            id: 'send-welcome',
            name: 'Send Welcome Message',
            type: 'NOTIFICATION',
            config: { template: 'welcome' }
          }
        ]
      }
    ];

    defaultWorkflows.forEach(workflow => {
      this.workflows.set(workflow.id, workflow);
    });
  }

  async executeWorkflow(workflowId: string, context: WorkflowExecutionContext): Promise<WorkflowResult> {
    const workflow = this.workflows.get(workflowId);
    
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const result: WorkflowResult = {
      workflowId,
      success: true,
      steps: [],
      startTime: new Date(),
      endTime: new Date(),
      error: null
    };

    try {
      for (const step of workflow.steps) {
        const stepResult = await this.executeStep(step, context);
        result.steps.push(stepResult);

        if (!stepResult.success) {
          result.success = false;
          result.error = stepResult.error;
          break;
        }
      }
    } catch (error) {
      result.success = false;
      result.error = error instanceof Error ? error.message : 'Unknown error occurred';
    } finally {
      result.endTime = new Date();
      this.addToHistory(result);
    }

    return result;
  }

  private async executeStep(step: WorkflowStep, context: WorkflowExecutionContext): Promise<{
    stepId: string;
    success: boolean;
    output: Record<string, unknown>;
    error: string | null;
    executionTime: number;
  }> {
    const startTime = Date.now();
    
    try {
      const stepContext: StepExecutionContext = {
        stepId: step.id,
        workflowId: 'unknown', // Would be set by caller
        userId: context.userId,
        sessionId: context.sessionId,
        input: {},
        output: {}
      };

      let output: Record<string, unknown> = {};

      switch (step.type) {
        case 'CREATE':
          output = await this.executeCreateStep(step, stepContext);
          break;
        case 'UPDATE':
          output = await this.executeUpdateStep(step, stepContext);
          break;
        case 'DELETE':
          output = await this.executeDeleteStep(step, stepContext);
          break;
        case 'NOTIFICATION':
          output = await this.executeNotificationStep(step, stepContext);
          break;
        case 'VALIDATION':
          output = await this.executeValidationStep(step, stepContext);
          break;
        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }

      return {
        stepId: step.id,
        success: true,
        output,
        error: null,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        stepId: step.id,
        success: false,
        output: {},
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        executionTime: Date.now() - startTime
      };
    }
  }

  private async executeCreateStep(step: WorkflowStep, context: StepExecutionContext): Promise<Record<string, unknown>> {
    // Simulate creating an entity
    const entity = step.config?.entity as string;
    const id = `created-${entity}-${Date.now()}`;
    
    return {
      id,
      entity,
      status: 'created',
      timestamp: new Date().toISOString()
    };
  }

  private async executeUpdateStep(step: WorkflowStep, context: StepExecutionContext): Promise<Record<string, unknown>> {
    // Simulate updating an entity
    const entity = step.config?.entity as string;
    const field = step.config?.field as string;
    
    return {
      entity,
      field,
      status: 'updated',
      timestamp: new Date().toISOString()
    };
  }

  private async executeDeleteStep(step: WorkflowStep, context: StepExecutionContext): Promise<Record<string, unknown>> {
    // Simulate deleting an entity
    const entity = step.config?.entity as string;
    
    return {
      entity,
      status: 'deleted',
      timestamp: new Date().toISOString()
    };
  }

  private async executeNotificationStep(step: WorkflowStep, context: StepExecutionContext): Promise<Record<string, unknown>> {
    // Simulate sending a notification
    const template = step.config?.template as string;
    
    return {
      notificationType: 'email',
      template,
      status: 'sent',
      timestamp: new Date().toISOString()
    };
  }

  private async executeValidationStep(step: WorkflowStep, context: StepExecutionContext): Promise<Record<string, unknown>> {
    // Simulate validation
    const rules = step.config?.rules as string[];
    
    return {
      validationRules: rules,
      status: 'validated',
      timestamp: new Date().toISOString()
    };
  }

  registerWorkflow(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
  }

  unregisterWorkflow(workflowId: string): boolean {
    return this.workflows.delete(workflowId);
  }

  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  private addToHistory(result: WorkflowResult): void {
    this.executionHistory.push(result);
    
    if (this.executionHistory.length > this.maxHistorySize) {
      this.executionHistory.shift();
    }
  }

  getExecutionHistory(): WorkflowResult[] {
    return [...this.executionHistory];
  }

  clearHistory(): void {
    this.executionHistory = [];
  }

  async getWorkflowStatistics(): Promise<{
    totalWorkflows: number;
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageExecutionTime: number;
  }> {
    const totalExecutions = this.executionHistory.length;
    const successfulExecutions = this.executionHistory.filter(r => r.success).length;
    const failedExecutions = totalExecutions - successfulExecutions;
    
    const totalExecutionTime = this.executionHistory.reduce((sum, result) => {
      return sum + (result.endTime.getTime() - result.startTime.getTime());
    }, 0);
    
    const averageExecutionTime = totalExecutions > 0 ? totalExecutionTime / totalExecutions : 0;

    return {
      totalWorkflows: this.workflows.size,
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      averageExecutionTime
    };
  }

  async validateWorkflow(workflow: Workflow): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!workflow.id || workflow.id.trim().length === 0) {
      errors.push('Workflow ID is required');
    }

    if (!workflow.name || workflow.name.trim().length === 0) {
      errors.push('Workflow name is required');
    }

    if (!workflow.steps || workflow.steps.length === 0) {
      errors.push('Workflow must have at least one step');
    }

    // Validate each step
    workflow.steps.forEach((step, index) => {
      if (!step.id || step.id.trim().length === 0) {
        errors.push(`Step ${index + 1}: Step ID is required`);
      }

      if (!step.name || step.name.trim().length === 0) {
        errors.push(`Step ${index + 1}: Step name is required`);
      }

      if (!step.type || step.type.trim().length === 0) {
        errors.push(`Step ${index + 1}: Step type is required`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
