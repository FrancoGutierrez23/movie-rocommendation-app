export class MovieHistoryStack {
    private stack: string[] = [];
  
    push(movieId: string) {
      this.stack.push(movieId);
    }
  
    pop(): string | undefined {
      return this.stack.pop();
    }
  
    peek(): string | undefined {
      return this.stack[this.stack.length - 1];
    }
  
    getAll(): string[] {
      return [...this.stack];
    }
  }
  