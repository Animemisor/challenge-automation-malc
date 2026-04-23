/**
 * ARCHIVO: utils/logger.ts
 * PROPÓSITO: Proporcionar logs estructurados y legibles.
 * PRINCIPIO ISTQB: Trazabilidad de la ejecución de pruebas.
 */

export class Logger {
  private static get timestamp(): string {
    return new Date().toISOString().substring(11, 19);
  }

  static step(stepNumber: number, description: string): void {
    console.log(`\n📌 [${this.timestamp}] STEP ${stepNumber}: ${description}`);
  }

  static success(message: string): void {
    console.log(`✅ [${this.timestamp}] ${message}`);
  }

  static info(message: string): void {
    console.log(`ℹ️ [${this.timestamp}] ${message}`);
  }

  static warning(message: string): void {
    console.log(`⚠️ [${this.timestamp}] ${message}`);
  }

  static error(message: string, error?: unknown): void {
    console.error(`❌ [${this.timestamp}] ${message}`);
    if (error) console.error(error);
  }

  static divider(): void {
    console.log('─'.repeat(60));
  }
}