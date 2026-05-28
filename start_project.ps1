Write-Host "Starting Backend and Engine via Docker..."
Start-Process powershell -ArgumentList "-NoExit -Command `"cd 'c:\Users\pavit\Downloads\Automated_data_cleaning_tool (3)\Automated_data_cleaning_tool'; docker-compose up`""

Start-Sleep -Seconds 3

Write-Host "Starting Frontend..."
Start-Process powershell -ArgumentList "-NoExit -Command `"cd 'c:\Users\pavit\Downloads\Automated_data_cleaning_tool (3)\Automated_data_cleaning_tool\frontend'; npm run dev`""
