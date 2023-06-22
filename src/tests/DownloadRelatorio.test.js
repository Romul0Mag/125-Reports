import { handleSave, generateCSV, saveAndShareFile } from './screens/ReportDetails'; // Importe a função ou componente relevante a ser testado

describe('handleSave', () => {
    it('deve chamar a função saveAndShareFile com o conteúdo correto', async () => {
      // Mock da função saveAndShareFile
    //   const saveAndShareFileMock = jest.fn();
  
      // Mock do conteúdo do arquivo CSV
      const textData = [{}]
      
      // Chame a função handleSave com a função mock e o conteúdo mock
      await handleSave(textData, generateCSV,saveAndShareFile);
  
    });
  });