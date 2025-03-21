export class MovieNode {
    id: number;
    title: string;
    // Using a Set to avoid duplicate related movies
    related: Set<MovieNode> = new Set();

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }

    addRelated(movie: MovieNode) {
        this.related.add(movie);
    }
}

export class MovieGraph {
    nodes: Map<number, MovieNode> = new Map();

    addMovie(id: number, title: string): MovieNode {
        if (!this.nodes.has(id)) {
            const node = new MovieNode(id, title);
            this.nodes.set(id, node);
            return node;
        }
        return this.nodes.get(id)!;
    }

    addEdge(movieId1: number, movieId2: number) {
        const movie1 = this.nodes.get(movieId1);
        const movie2 = this.nodes.get(movieId2);
        if (movie1 && movie2) {
            movie1.addRelated(movie2);
            movie2.addRelated(movie1);
        }
    }

    // Breadth-First Search (BFS) to find movies within a given degree of relation
    bfs(startId: number, maxDepth: number = 2): MovieNode[] {
        const start = this.nodes.get(startId);
        if (!start) return [];

        const visited = new Set<number>();
        const queue: { node: MovieNode; depth: number }[] = [{ node: start, depth: 0 }];
        const result: MovieNode[] = [];

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            if (depth > maxDepth) continue;
            if (!visited.has(node.id)) {
                visited.add(node.id);
                result.push(node);
                node.related.forEach((neighbor) => {
                    if (!visited.has(neighbor.id)) {
                        queue.push({ node: neighbor, depth: depth + 1 });
                    }
                });
            }
        }
        return result;
    }
}
