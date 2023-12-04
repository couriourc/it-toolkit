package backend

import (
	"changeme/backend/api/service"
	"context"
	"github.com/jinzhu/gorm"
	"github.com/sirupsen/logrus"
	viper "github.com/spf13/viper"
	"io"
	"os"
	user "os/user"
)

// App struct
type App struct {
	ctx        context.Context
	DB         *gorm.DB
	log        *logrus.Logger
	killSignal chan struct{}

	server  *service.BackgroundServer
	config  struct{}
	Network struct {
		URL     string
		Handles struct {
			Send        string // Takes TX Object, returns TX Hash (200)
			Transaction string // Takes TX Object, returns TX Hash (200)
			Balance     string // Polls the wallets available balance
		}
		BlockExplorer struct {
			URL     string
			Handles struct {
				Transactions string // Takes TX Hash, returns TX info
				Checkpoints  string // Takes Checkpoint block hash, returns checkpoint block info
				Snapshots    string // Takes SnapshotHash, returns info
				CollectTX    string // Takes DAG address, returns tx objects

			}
		}
	}

	paths struct {
		HomeDir      string
		DAGDir       string
		TMPDir       string
		EncryptedDir string
		EmptyTXFile  string
		LOGFILE      string
		PrevTXFile   string
		LastTXFile   string
		AddressFile  string
		ImageDir     string
		Java         string
	}

	KeyStoreAccess      bool
	TransactionFinished bool
	TransactionFailed   bool
	UserLoggedIn        bool
	NewUser             bool
	FirstTX             bool
	SecondTX            bool
	WidgetRunning       struct {
		PassKeysToFrontend bool
		DashboardWidgets   bool
	}
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (app *App) WailsShutdown() {
	close(app.killSignal)

	app.DB.Close()
	app.server.Close()
}

func initDirectoryStructure(app *App) error {
	user, err := user.Current()
	if err != nil {
		return err
	}
	app.paths.HomeDir = user.HomeDir
	app.paths.DAGDir = app.paths.HomeDir + "/.dag" // DAG directory for configuration files and wallet specific data
	app.paths.TMPDir = app.paths.DAGDir + "/tmp"

	app.paths.LastTXFile = app.paths.TMPDir + "/last_tx"
	app.paths.PrevTXFile = app.paths.TMPDir + "/prev_tx"
	app.paths.EmptyTXFile = app.paths.TMPDir + "/genesis_tx"
	app.paths.LOGFILE = app.paths.TMPDir + "/.log"
	app.paths.ImageDir = "./frontend/src/assets/img/" // Image Folder
	app.log.Info("DAG Directory: ", app.paths.DAGDir)

	err = DirectoryCreator(app.paths.DAGDir, app.paths.TMPDir)
	return err
}

func initConfigurationLoader(app *App) {
	viper.SetConfigName("config")
	viper.SetConfigType("json")
	viper.AddConfigPath(app.paths.DAGDir)
}
func initLogger(app *App) {
	logFile, err := os.OpenFile(app.paths.LOGFILE,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY,
		0664)

	if err != nil {
		app.log.Fatal("Unable to create log file")
	}
	mw := io.MultiWriter(os.Stdout, logFile)
	app.log.SetOutput(mw)
	app.log.SetFormatter(&logrus.TextFormatter{
		ForceColors:   true,
		FullTimestamp: true,
	})
}

// Startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (app *App) Startup(ctx context.Context) {
	app.ctx = ctx
	app.log = logrus.New()
	err := initDirectoryStructure(app)
	if err != nil {
		app.log.Errorln("Unable to set up directory structure. Reason: ", err)
	}
	initConfigurationLoader(app)
	initBackgroundServer(app)
	initLogger(app)
}

func initBackgroundServer(app *App) {
	app.server = service.NewBackgroundServer()
	app.server.Startup()

}
