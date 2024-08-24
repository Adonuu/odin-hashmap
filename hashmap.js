class HashMap {
    constructor(loadFactor) {
        this.capacity = 16;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.map = Array(this.capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return Math.abs(hashCode % this.capacity);
    }

    resize() {
        this.capacity *= 2;
        let newBuckets = Array(this.capacity).fill(null).map(() => []);

        this.map.forEach(bucket => {
            bucket.forEach(([key, value]) => {
                newBuckets[this.hash(key)].push([key, value]);
            });
        });

        this.map = newBuckets;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.map[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.map[index];

        for (let [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }

        return undefined;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.map[index];

        for (let [k, v] of bucket) {
            if (k === key) {
                return true;
            }
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.map[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.map = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const keys = [];
        this.map.forEach(bucket => {
            bucket.forEach(([key, value]) => {
                keys.push(key);
            });
        });
        return keys;
    }

    values() {
        const values = [];
        this.map.forEach(bucket => {
            bucket.forEach(([key, value]) => {
                values.push(value);
            });
        });
        return values;
    }

    entries() {
        const entries = [];
        this.map.forEach(bucket => {
            bucket.forEach(([key, value]) => {
                entries.push([key, value]);
            });
        });
        return entries;
    }
}

const test = new HashMap(0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('lion', 'test');
test.set('moon', 'silver');