export const copyToClipboard = async (text: string): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    try {
      const cb = navigator.clipboard
      cb.writeText(text).then(resolve).catch(reject)

      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
