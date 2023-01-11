import { Injectable } from '@angular/core'
import { TrieNode } from './autocomplete'

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  private root: TrieNode
  private suggestions: Set<string>

  constructor() {
    this.root = this.createNode(null)
    this.suggestions = new Set()
  }

  /**
   * Get suggestions
   *
   * Exit early if there is no query or matching nodes.
   * Call find() to recursively find words that start with the query string.
   */
  getSuggestions(query: string) {
    this.suggestions.clear()
    if (!query) return this.suggestions

    let current = this.root
    for (let char of query.toUpperCase()) {
      if (!current.children.has(char)) return this.suggestions
      // Ignore type error: current.children.get(char) can't be undefined
      // @ts-ignore
      current = current.children.get(char)
    }
    this.find(current, query)
    return this.suggestions
  }
  find(current: TrieNode, query: string) {
    if (current.last) return this.suggestions.add(query.toUpperCase())

    current.children.forEach((value: any, key: string, _: any) => {
      this.find(value, query + key)
    })
    return
  }

  /**
   * Insert new word
   *
   * Iterate over the characters of the word and
   * check if character is represented by the node, create new node if it isn't,
   * and proceed down the Trie until all characters are consumed.
   */
  insert(word: string) {
    let current = this.root
    for (let char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, this.createNode(char))
      }
      // Ignore type error: current.children.get(char) can't be undefined
      // @ts-ignore
      current = current.children.get(char)
    }
    current.last = true
  }
  createNode(value: string | null): TrieNode {
    return {
      value: value?.toUpperCase() ?? null,
      last: false,
      children: new Map(),
    }
  }
}
