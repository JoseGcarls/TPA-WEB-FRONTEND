
export function readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const filereader = new FileReader();
        filereader.readAsDataURL(file)
        filereader.onerror = () => {
            reject(filereader.error)
        }
        filereader.onload = () => {
            resolve(filereader.result as string)
        }
    })
}


export async function readFiles(files: FileList): Promise<string[]> {
    const promises = Array.from(files).map(e =>
        readFile(e)
    )
    const result = Promise.all(promises)
    return result
}
