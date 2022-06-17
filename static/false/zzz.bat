for %%f in (*.png) do (
	backgroundremover -i %1 -o "../%%f"
	echo .
)