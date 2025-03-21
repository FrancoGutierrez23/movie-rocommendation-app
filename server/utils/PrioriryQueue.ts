interface QueueItem<T> {
    priority: number;
    item: T;
  }
  
  export class PriorityQueue<T> {
    private items: QueueItem<T>[] = [];
  
    enqueue(item: T, priority: number) {
      const newItem: QueueItem<T> = { item, priority };
      this.items.push(newItem);
      // Sort in descending order (highest priority first)
      this.items.sort((a, b) => b.priority - a.priority);
    }
  
    dequeue(): T | undefined {
      return this.items.shift()?.item;
    }
  
    peek(): T | undefined {
      return this.items[0]?.item;
    }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
  