export type TrieNode = {
  value: string | null
  last: boolean
  children: Map<string, TrieNode | undefined>
}
