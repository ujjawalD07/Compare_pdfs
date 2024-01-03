const fs = require('fs');
const pdf = require('pdf-parse');

function finddiff(text1, text2) {

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    const length = Math.min(lines1.length, lines2.length);
    
    let difference = '';
    if (lines1.length !== lines2.length) 
    {
        const stop= 'PDFs have different line counts. PDFs are different';
        return stop;
    }
    for (let i=0;i<length;i++) 
    {
        if (lines1[i]!==lines2[i]) 
            difference += `Line ${i + 1}: ${lines1[i]} !== ${lines2[i]}\n`;
    }
    if (difference === '') 
        difference+='PDFs are identical';
    else 
        console.log('PDFs are different.');
    return difference;
}


async function read(filepath1,filepath2) {
    try {
        const buffer1 = fs.readFileSync(filepath1);
        const buffer2 = fs.readFileSync(filepath2);

        const data1 = await pdf(buffer1);
        const data2 = await pdf(buffer2);

        ans=finddiff(data1.text.trim(),data2.text.trim());
        console.log();
        console.log(ans);
        console.log();

    } catch (error) {
        console.error('Error reading PDF:', error.message);
    }
}

path1 = './files/1.pdf';
path2 = './files/2.pdf';
read(path1,path2);