export class MovieQueue {
    private queue: string[] = [];
  
    enqueue(movieId: string) {
      this.queue.push(movieId);
    }
  
    dequeue(): string | undefined {
      return this.queue.shift();
    }
  
    peek(): string | undefined {
      return this.queue[0];
    }
  
    isEmpty(): boolean {
      return this.queue.length === 0;
    }
  }
  